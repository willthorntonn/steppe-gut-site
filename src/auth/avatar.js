// Shared avatar handling for the account area. Used by the onboarding modal
// (components/auth/AuthModal) and the header's Edit Profile dialog
// (components/account/EditProfileModal), so the "pick a photo" behaviour is
// identical in both places: same size cap, same square crop, same stored size.

export const MAX_AVATAR_BYTES = 6 * 1024 * 1024; // 6 MB before downscaling
export const AVATAR_PX = 256; // stored square size - keeps the data URL small

// Downscale + square-crop the chosen image on a canvas before it is stored.
// A raw phone photo as a data URL can be several MB, which would blow the
// localStorage quota the whole account object shares with the cart.
export function fileToAvatarDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("That file is not a readable image"));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = AVATAR_PX;
        canvas.height = AVATAR_PX;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, sx, sy, side, side, 0, 0, AVATAR_PX, AVATAR_PX);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
