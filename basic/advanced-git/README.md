# Advanced Git

## Internal Model
### git object types -- all are in 40-char sha1 hash as their filenames. Git uses the first 2 chars to organzie in directories.
* commit 
* tree 
* blob

## Commit by hand (repo internals)
```
echo "bla bla ..." | git hash-object -w --stdin

git cat-file -p ${file-hashcode}         # print content
git cat-file -t ${file-hashcode}         # type

git update-index --add --cacheinfo 100644 ${file-hashcode} test-001.txt

git write-tree

# .git/HEAD contains
# ref: refs/heads/master
# i.e. master must exist under .git/refs/heads dir
# all branches exist under .git/refs/heads

git commit-tree ${tree-hashcode} -m "Crazy commit under the hood"

git update-ref refs/heads/master ${commit-hash-code}

git checkout HEAD -- test-001.txt

```
## Rebase
```
# merge vs rebase 
# fix merge/rebase issue

git rev-parse master 
git reset --hard ...

git reflog 
git rev-parse HEAD@{1}

git reset --hard HEAD@{1}

```
## Interactive Rebase
```
git rebase -i HEAD~6
```
## rebase-on-pull
## External diff tools
```
git config --local --unset merge.tool
git config --global diff.tool p4merge ???
git config --global difftool.prompt false  ???
git difftool

git config --global merge.tool p4merge
git config --global mergetool.prompt false
git config --global mergetool.keepbackup false
git config --global mergetool.keeptemporaries false
git mergetool
```
## Advanced logging
```
# ref to my alias
git config --global alias.glog log --all --decorate --graph
git glog
```
[Advanced git-log](https://www.atlassian.com/git/tutorials/git-log)
## Reflog
## Reset 
* `git reset HEAD~2`
    * head ref points to HEAD~2 inside `git ref-log`
    * leave changes in current working directory
* `git reset --soft HEAD~2`
    * head ref points to HEAD~2 inside `git ref-log`
    * leave changes in staging area
* `git reset --hard HEAD~2`
    * head ref points to HEAD~2 inside `git ref-log`
    * discard all changes, but leave new added files. Use **git clean** to delete all new files

* `git clean -df`
remove untrack files

## Revert
`git revert ${commit_hashcode}`

Undo that commit specified by hashcode

## Configuration
- local configuration
    - ${projectDir}/.git/config
- global configuration
    - ${homeDir}/.gitconfig
- system configuration


# Reference
- [Git Internals PDF](https://github.com/pluralsight/git-internals-pdf)
- [Advanced Git](https://www.youtube.com/watch?v=0SJCYPsef54)
- [Advanced Git for Developers](https://www.youtube.com/watch?v=duqBHik7nRo)
- [Fixing Common Mistakes and Undoing Bad Commits](https://www.youtube.com/watch?v=FdZecVxzJbk)
- [Visual Git Reference](https://marklodato.github.io/visual-git-guide/index-en.html)