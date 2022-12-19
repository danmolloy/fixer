const { GoogleSocialLogin, GitHubSocialLogin } = require("cypress-social-logins").plugins

module.exports = (on, config) => {
  on("task", {
    GoogleSocialLogin: GoogleSocialLogin,
    GitHubSocialLogin: GitHubSocialLogin
  })
}