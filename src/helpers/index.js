import { ROLES } from "@/constants";

export function getDropList(isAuth, currentUser, post) {
  const dropItems = [{ title: "Copy link", icon: "share", emit: "share-post" }];

  if (isAuth) {
    dropItems.push({
      title: "Save post",
      icon: "bookmark",
      emit: "save-post",
    });

    let isAdmin = false;

    currentUser.roles.forEach((role) => {
      if (role === ROLES.ADMIN) isAdmin = true;
    });

    if (currentUser.id === post?.author?._id) {
      dropItems.push({
        title: "Edit post",
        icon: "edit",
        emit: "edit-post",
      });
      dropItems.push({
        title: "Delete post",
        icon: "trash",
        emit: "delete-post",
      });
    } else if (isAdmin) {
      dropItems.push({
        title: "Delete post",
        icon: "trash",
        emit: "delete-post",
      });
    }
  }

  return dropItems;
}
