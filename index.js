import { findByProps } from '@goosemod/webpack';

const Dispatcher = findByProps("dispatch");
const Profile = findByProps("getProfile");
const isSpotifyPremium = findByProps("isSpotifyPremium");

let getProfilePatch, isSpotifyPremiumPatch, patched = false;


function patch() {
  if (patched) return;
  patched = true;

  getProfilePatch = goosemod.patcher.patch(Profile, "getProfile", function (args) {
    isSpotifyPremiumPatch = goosemod.patcher.patch(isSpotifyPremium, "isSpotifyPremium", function () {
      return true;
    });

    Dispatcher.dispatch({ type: "SPOTIFY_PROFILE_UPDATE", accountId: args[0], isPremium: true });
  });
}

function unPatch() {
  if (!patched) return;
  try { getProfilePatch(); } catch { };
  try { isSpotifyPremiumPatch(); } catch { };
}

export default {
  goosemodHandlers: {
    onImport() {
      patch();
    },
    onRemove() {
      unPatch();
    }
  }
};