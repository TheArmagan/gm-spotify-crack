(() => {
  const Dispatcher = goosemod.webpackModules.findByProps("dispatch");
  const Profile = goosemod.webpackModules.findByProps("getProfile");
  const isSpotifyPremium = goosemod.webpackModules.findByProps("isSpotifyPremium");

  let getProfilePatch, isSpotifyPremiumPatch;

  getProfilePatch = goosemod.patcher.patch(Profile, "getProfile", function (args) {
    isSpotifyPremiumPatch = goosemod.patcher.patch(isSpotifyPremium, "isSpotifyPremium", function () {
      return true;
    });
    
    Dispatcher.dispatch({ type: 'SPOTIFY_PROFILE_UPDATE', accountId: args[0], isPremium: true });
  });
})();