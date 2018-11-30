import authen

# 创建测试用户并设置权限
authen.authenticator.add_user('joe', 'joepassword')
authen.authorizor.add_permission('test program')
authen.authorizor.add_permission('change program')
authen.authorizor.permit_user('test program', 'joe')

class Editor:
    def __init__(self):
        self.username = None
        self.menu_map = {
            'login': self.login,
            'test': self.test,
            'change': self.change,
            'quit': self.quit
        }

    def login(self):
        logged_in = False
        while not logged_in:
            username = input('username: ')
            password = input('password: ')
            try:
                logged_in = authen.authenticator.login(username, password)
            except authen.InvalidUsername:
                print('Sorry, that username does not exists')
            except authen.InvalidPassword:
                print('Sorry, incorrect password')
            else:
                self.username = username

    def is_permitted(self, permission):
        try:
            authen.authorizor.check_permission(permission, self.username)
        except authen.NotLoggedInError as e:
            print('{} is not logged in'.format(e.username))
            return False
        except authen.NotPermittedError as e:
            print('{} cannot {}'.format(e.username, permission))
            return False
        else:
            return True

    def test(self):
        if self.is_permitted('test program'):
            print('Testing program now...')

    def change(self):
        if self.is_permitted('change program'):
            print('Changing program now...')

    def quit(self):
        raise SystemExit()

    def menu(self):
        try:
            answer = ''
            while True:
                print('Please enter a command:\n'
                      '\tlogin\tLogin\n'
                      '\ttest\tTest the program\n'
                      '\tchange\tChange the program\n'
                      '\tquit\tQuit\n')
                answer = input('enter a command: ').lower()
                try:
                    func = self.menu_map[answer]
                except KeyError:
                    print('{} is not a valid option'.format(answer))
                else:
                    func()
        finally:
            print('Thank you for testing the authen module')

if __name__ == '__main__':
    Editor().menu()
