import ContentLoader from "react-content-loader";

const MediaListSkeleton = () => {
  return (
    <ContentLoader viewBox="0 0 300 200">
    <rect x="0" y="0" rx="10" ry="10" width="300" height="320" /> 
    {/* <rect x="10" y="160" rx="5" ry="5" width="200" height="10" /> */}

  </ContentLoader>
  )
}

export default MediaListSkeleton