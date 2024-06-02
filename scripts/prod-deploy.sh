#!/usr/bin/env bash
if output=$(git status --porcelain) && [ -z "$output" ]; then
  # Working directory clean
  git checkout master 
  dir="build"
  [ -d  $dir ] && rm  -rf $dir

  file="build.zip "
  [ -f $file ] && rm  -rf $file

  npm run build &&
  zip -r build.zip ../build/ &&
  echo "zip completed" &&

  scp -r build.zip root@165.232.177.25:/root/sarga-public-portal/ &&
  ssh root@165.232.177.25 'cd /root/sarga-public-portal/build; unzip -o build.zip; rm build.zip' &&
  echo "Deployment completed" 

  echo "Clearing Deployment junks" 
  # [ -d  $dir2 ] && rm  -rf $dir2
  [ -d  $dir ] && rm  -rf $dir
  [ -f $file ] && rm  -rf $file
  git checkout develop
  exit
else 
  echo "build failed : git status not clean"
  exit
fi

