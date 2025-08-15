import React from "react";

const BannerSection = () => {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container-full">
        <div className="banner-lookbook">
          
          <video
            src="/banner-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/banner-video.mp4"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 12,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
