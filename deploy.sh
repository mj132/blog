#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vitepress/dist

# deploy to github
if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:mj132/blog.git
else
  msg='auto deploy'
  githubUrl=https://mj132:${GITHUB_TOKEN}@github.com/mj132/blog.git
  git config --global user.name "MJ"
  git config --global user.email "1329442936@qq.com"
fi

git init
git add -A
git commit -m "${msg}"

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f $githubUrl master:gh-pages
cd -
rm -rf docs/.vitepress/dist