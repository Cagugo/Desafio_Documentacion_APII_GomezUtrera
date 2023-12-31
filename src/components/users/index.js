const CustomRouter = require('../../routes/router');
const usersController = require('./usersController/usersController');
const { validateUserId } = require('../../utils/routes/routerParams');

class UsersRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    this.router.param('uid', validateUserId);

    const basePath = '/api/session/useradmin';
    const basePathUsersPremium = '/api/users/premium';
    this.get(`${basePath}/`, ['PUBLIC'], usersController.getUsers);
    this.post(`${basePath}/recovery`, ['PUBLIC'], usersController.recoveryUser);
    this.post(`${basePath}/resetpass`, ['PUBLIC'], usersController.resetPass);
    this.get(`${basePath}/resetpassbyemail`, ['PUBLIC'], usersController.resetPassByEmail);
    this.post(`${basePath}/register`, ['PUBLIC'], usersController.addUser);
    this.get(`${basePath}/:uid`, ['ADMIN'], usersController.getUserById);
    this.put(`${basePath}/:uid`, ['ADMIN'], usersController.updateUser);
    this.delete(`${basePath}/:uid`, ['ADMIN'], usersController.deleteUser);
    this.put(`${basePathUsersPremium}/:uid`, ['PREMIUM'], usersController.updateUserPremium);
  }
}
module.exports = new UsersRoutes();
