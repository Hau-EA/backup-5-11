#!/usr/bin/env bash

SRC_DIR=$APPCENTER_SOURCE_DIRECTORY
MOBILE_DIR=apps/mobile
POD_DIR=$MOBILE_DIR/ios

# CACHE_DIR=/Users/stephenvu/Work/Azure/cache
NODE_CACHE_FILE=nodecache.tar.gz
NODE_MOB_CACHE_FILE=nodemobcache.tar.gz
POD_CACHE_FILE=podcache.tar.gz

# Determining the App OS and Build Version using Environment variables
BUILD_OS="IOS"
if [ -z "$APPCENTER_XCODE_PROJECT" ];then
    BUILD_OS="ANDROID"
fi

# Prepare script
echo "Running appcenter-cache.sh script at:"
pwd


login_azure() {
  echo "Logging into Azure"
  azcopy login --service-principal  --application-id=$AZCOPY_APPLICATION_ID --tenant-id=$AZCOPY_TENANT_ID || true
}

download_caches() {
  echo " "
  echo "DOWNLOADING CACHES"
  login_azure
  download_node
  if [ "$BUILD_OS" == "IOS" ]; then
    download_pods
  fi
}

update_caches() {
  echo " "
  echo "UPDATING CACHES"
  login_azure
  update_node
  if [ "$BUILD_OS" == "IOS" ]; then
    update_pods
  fi
}

download_node() {
  # cp $CACHE_DIR/$NODE_CACHE_FILE . || true
  # cp $CACHE_DIR/$NODE_MOB_CACHE_FILE . || true
  # cp $CACHE_DIR/yarn.lock.sha256sum . || true

  azcopy copy "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$NODE_CACHE_FILE" . || true
  azcopy copy "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$NODE_MOB_CACHE_FILE" . || true
  azcopy copy "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/yarn.lock.sha256sum" . || true

  if [[ -f $NODE_CACHE_FILE ]]; then
    echo "Extracting root node cache"
    unpigz < $NODE_CACHE_FILE | tar -xC . || true
  else
    echo "Root Node cache unavailable"
  fi

  if [[ -f $NODE_MOB_CACHE_FILE ]]; then
    echo "Extracting mobile node cache"
    unpigz < $NODE_MOB_CACHE_FILE | tar -xC $MOBILE_DIR || true
  else
    echo "Mobile Node cache unavailable"
  fi
}

download_pods() {
  # cp $CACHE_DIR/$POD_CACHE_FILE . || true
  # cp $CACHE_DIR/Podfile.lock.sha256sum . || true

  azcopy copy "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$POD_CACHE_FILE" . || true
  azcopy copy "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/Podfile.lock.sha256sum" . || true

  if [[ -f $POD_CACHE_FILE ]]; then
    echo "Extracting pods cache"
    unpigz < $POD_CACHE_FILE | tar -xC $POD_DIR || true
  else
    echo "Pods cache unavailable"
  fi
}

update_node() {
  if ! shasum -a 256 -c yarn.lock.sha256sum; then
    echo "Removing old node cache"
    rm -rf $NODE_CACHE_FILE
    rm -rf $NODE_MOB_CACHE_FILE
    rm -rf yarn.lock.sha256sum
    echo "yarn.lock checksum does not match cache"
    shasum -a 256 yarn.lock > yarn.lock.sha256sum
    echo "Archiving node caches"
    tar cf - node_modules | pigz -1 -p 32 > $NODE_CACHE_FILE
    tar cf - -C $MOBILE_DIR node_modules | pigz -1 -p 32 > $NODE_MOB_CACHE_FILE
    NODE_ARCHIVE_SIZE=$(wc -c < $NODE_CACHE_FILE)
    if [[ $NODE_ARCHIVE_SIZE -ge 1000000 ]]; then
      echo "Uploading node caches"
      # cp $NODE_CACHE_FILE $CACHE_DIR/$NODE_CACHE_FILE || true
      # cp $NODE_MOB_CACHE_FILE $CACHE_DIR/$NODE_MOB_CACHE_FILE || true
      # cp yarn.lock.sha256sum $CACHE_DIR/yarn.lock.sha256sum || true

      azcopy copy $NODE_CACHE_FILE "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$NODE_CACHE_FILE" || true
      azcopy copy $NODE_MOB_CACHE_FILE "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$NODE_MOB_CACHE_FILE" || true
      azcopy copy yarn.lock.sha256sum "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/yarn.lock.sha256sum" || true

    else
      echo "Node caches archive is too small to be valid, not uploading"
    fi
  else
    echo "yarn.lock hash is the same as cache, not updating cache"
  fi
}

update_pods() {
  cp $POD_DIR/Podfile.lock . || true

  if ! shasum -a 256 -c Podfile.lock.sha256sum; then
    echo "Removing old Pods cache"
    rm -rf $POD_CACHE_FILE
    rm -rf Podfile.lock.sha256sum
    echo "Podfile.lock checksum does not match cache"
    shasum -a 256 Podfile.lock > Podfile.lock.sha256sum
    echo "Archiving Pods cache"
    tar cf - -C $POD_DIR Pods | pigz -1 -p 32 > $POD_CACHE_FILE
    POD_ARCHIVE_SIZE=$(wc -c < $POD_CACHE_FILE)
    if [[ $POD_ARCHIVE_SIZE -ge 1000000 ]]; then
      echo "Uploading Pod cache"
      cp $POD_CACHE_FILE $CACHE_DIR/$POD_CACHE_FILE || true
      cp Podfile.lock.sha256sum $CACHE_DIR/Podfile.lock.sha256sum || true

      azcopy copy $POD_CACHE_FILE "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/$POD_CACHE_FILE" || true
      azcopy copy Podfile.lock.sha256sum "https://$AZURE_STORAGE_ACCOUNT_NAME.blob.core.windows.net/appcenter-cache/$APPCENTER_BRANCH/Podfile.lock.sha256sum" || true

    else
      echo "Pod cache archive is too small to be valid, not uploading"
    fi
  else
    echo "Podfile.lock hash is the same as cache, not updating cache"
  fi
}

case $1 in
login)
  login_azure
  ;;
download)
  download_caches
  ;;
update)
  update_caches
  ;;
*)
  echo "Usage: $0 {login|download|update}"
  exit 1
  ;;
esac
