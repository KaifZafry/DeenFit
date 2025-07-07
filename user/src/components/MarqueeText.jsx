import React, { useRef } from "react"

const BrandMarquee = () => {
  const marqueeRef = useRef(null)

  const handleMouseEnter = () => {
    marqueeRef.current.style.animationPlayState = "paused"
  }

  const handleMouseLeave = () => {
    marqueeRef.current.style.animationPlayState = "running"
  }

  return (
    <div data-aos="fade-up" data-aos-duration="500" className="marquee-wrapper2" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="marquee-track" ref={marqueeRef}>
        {/* Duplicate content for seamless scroll */}
        {[...Array(2)].map((_, index) => (
          <div className="marquee-group2" key={index}>
            <div className="brand-item">
              <p className="display-2xl fw-semibold text-grey-7">Free Shipping</p>
            </div>
            <div className="brand-item">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
              </svg>
            </div>
            <div className="brand-item">
              <p className="display-2xl fw-semibold text-clip-2">Shop Now, Pay Later</p>
            </div>
            <div className="brand-item">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M42 18.9H26.04L37.38 7.56L34.44 4.62L23.1 15.96V0H18.9V15.96L7.56 4.62L4.62 7.56L15.96 18.9H0V23.1H15.96L4.62 34.44L7.56 37.38L18.9 26.04V42H23.1V26.04L34.44 37.38L37.38 34.44L26.04 23.1H42V18.9Z" fill="#7B53FF"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandMarquee
