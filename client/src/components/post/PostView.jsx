import React, { useMemo } from "react";
import { MdOutlineReport } from "react-icons/md";
import { deletePostAction } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Like from "./Like";
import CommentForm from "../form/CommentForm";
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmarkSquare,
} from "react-icons/hi2";

const PostView = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.userData);
  const { body, fileUrl, user, community, createdAt, comments } = post;
  // Memoize the file extension check to avoid recomputing it unnecessarily
  const isImageFile = useMemo(() => {
    const validExtensions = [".jpg", ".png", ".jpeg", ".gif", ".webp", ".svg"];
    const fileExtension = fileUrl?.slice(fileUrl.lastIndexOf("."));
    return validExtensions.includes(fileExtension);
  }, [fileUrl]);

  const deleteHandler = () => {
    dispatch(
      deletePostAction(post._id, () =>
        navigate(location.state ? location.state.from : "/")
      )
    );
  };

  return (
    <div className="px-6 py-6 rounded-xl shadow-xl bg-white border border-gray-100">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-full overflow-hidden"
            src={user.avatar}
            alt="user avatar"
            style={{ width: "50px" }}
            loading="lazy"
          />
          <div className="">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{community.name}</p>
          </div>
        </div>
        <p>{createdAt}</p>
      </div>

      <div>
        <p className="text-lg">{body}</p>
        <div className="flex justify-center">
          {fileUrl && isImageFile ? (
            <img
              className="w-[800px] h-auto rounded-xl mt-3"
              src={fileUrl}
              alt={body}
              loading="lazy"
            />
          ) : (
            fileUrl && (
              <video
                className="w-[800px] h-auto rounded-xl mt-3"
                src={fileUrl}
                controls
              />
            )
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {/* like button here */}
            <Like post={post} />
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineChatBubbleOvalLeft />
              {comments.length}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center text-xl gap-1">
              {" "}
              <HiOutlineBookmarkSquare />
              Save
            </button>
            <button className="flex items-center text-xl gap-1">
              {" "}
              <MdOutlineReport />
              Report
            </button>

            {userData?.id === post.user._id && (
              <button
                onClick={deleteHandler}
                className="flex items-center text-xl gap-1"
              >
                <MdOutlineReport />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <CommentForm communityId={community._id} />
      </div>
    </div>
  );
};

export default PostView;