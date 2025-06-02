import ContentLoader from "react-content-loader"

export default function ShimmerBox(props) {
  // We’ll use 100% width and height to fill the container.
  // react-content-loader requires fixed pixel width/height,
  // so we'll dynamically get container size via CSS.

  return (
    <ContentLoader
      {...props}
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      backgroundColor="#2c2e3a"
      foregroundColor="#424b69"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Rectangle fills the whole viewBox */}
      <rect x="0" y="0" rx="0" ry="0" width="100" height="100" />
    </ContentLoader>
  )
}
