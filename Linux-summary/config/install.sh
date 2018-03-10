#######################################################
# INSTALL BASIC APPLICATION ON DEBIAN BASIC OR MAC OS #
#######################################################

# 0. CONFIG
[ $(uname -s | grep -c CYGWIN) -eq 1 ] && OS_NAME="CYGWIN" || OS_NAME=`uname -s`
function updaterc() {
    if [[ -s ~/.zshrc ]]; then
        source ~/.zshrc;
    elif [[ -s ~/.bashrc ]]; then
        source ~/.bashrc;
    else
        echo "Not found rc file"
    fi
}
updaterc

# 1. KEEP UP TO DATE
if [ $OS_NAME == Darwin ]; then
    # install homebrew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew update
    brew upgrade

    # intall pip
    brew install python3
    pip install -U pip

    # install autojump
    if ! [ -x "$(which autojump)" ]; then
        brew install autojump
    fi

	# install emacs
	[ -x "$(which emacs)" ] || brew install emacs

    # install git
    [ -x "$(which git)" ] || brew install git

    # install git flow
    [ -x "$(which git-flow)" ] || brew install git-flow

    updaterc
else
    sudo apt-get -y update
    sudo apt-get -y upgrade
    sudo apt-get -y dist-upgrade
    sudo apt-get -y autoremove

    # install pip
    if ! [ -x "$(which pip)" ]; then
        sudo apt-get install -y python3-venv python3-pip
        pip3 install -U pip
    fi

    # install autojump
    [ -x "$(which autojump)" ] || sudo apt-get install -y autojump;

	# install emacs
	if ! [ -x "$(which emacs25)" ]; then
		sudo add-apt-repository -y ppa:kelleyk/emacs
		sudo apt-get update
		sudo apt-get install -y emacs25
	fi

    # install git
    [ -x "$(which git)" ] || sudo apt-get install -y git

    # install git flow
    [ -x "$(which git-flow)" ] || sudo apt-get install -y git-flow

    # install xsel
    [ -x "$(which xsel)" ] || sudo apt-get install -y xsel;

    updaterc
    alias sudo='sudo -H env PATH=$PATH'
fi

# install emacs.d
if ! [ -f $HOME/.emacs.d/README.org ]; then
	rm $HOME/.emacs.d/init.el
	git clone https://github.com/redguardtoo/emacs.d.git $HOME/.emacs.d
	# Use stable version
	#cd .emacs.d; git reset --hard stable
fi

# install percol
[ -x "$(which percol)" ] || sudo pip install percol

# install virtualenv
[ -x "$(which virtualenv)" ] || sudo pip install virtualenv
[ "$(type -t mkvirtualenv)" = function ] || sudo pip install virtualenvwrapper
[ -d $HOME/.envs ] || mkdir $HOME/.envs

# install nvm
[ "$(type -t nvm)" = function ] || curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# download git bash setting
BASH_GIT_SETTING_PATH="$HOME/.bash_git_setting"
GIT_COMPLETION_BASHFILE="https://raw.githubusercontent.com/JMwill/wiki/master/Linux-summary/ubuntu-summary/bash-git-set/git-completion.bash"
GIT_PROMPT_SHFILE="https://raw.githubusercontent.com/JMwill/wiki/master/Linux-summary/ubuntu-summary/bash-git-set/git-prompt.sh"
BASH_CONFIG_FILE="https://raw.githubusercontent.com/JMwill/wiki/master/Linux-summary/config/my_bash_config"

if ! [ -d $BASH_GIT_SETTING_PATH ]; then
    mkdir $BASH_GIT_SETTING_PATH
fi
if ! [ -f $BASH_GIT_SETTING_PATH/git-completion.bash ]; then
    wget -c $GIT_COMPLETION_BASHFILE -O "$BASH_GIT_SETTING_PATH/git-completion.bash"
    WGET_PID2=$!
fi
if ! [ -f $BASH_GIT_SETTING_PATH/git-prompt.sh ]; then
    wget -c $GIT_PROMPT_SHFILE -O "$BASH_GIT_SETTING_PATH/git-prompt.sh"
    WGET_PID3=$!
fi

# download bash config file
if ! [ -f $HOME/my_bash_config ]; then
    wget -c $BASH_CONFIG_FILE -O "$HOME/my_bash_config"
    WGET_PID1=$!
fi

LINE="if [ -f ~/my_bash_config ]; then"
FILE=".bashrc"
grep -qF -- "$LINE" $FILE || echo "
# self bash config file
$LINE
    . ~/my_bash_config
fi" >> "$FILE"

wait $WGET_PID1 $WGET_PID2 $WGET_PID3
updaterc
