import { CSSProperties, HTMLAttributes, SVGAttributes, useState } from "react"

interface IStarRatingProps extends HTMLAttributes<HTMLDivElement> {
  maxRating?: number
  color?: string
  size?: number
  messages?: Array<string>
  defaultRating?: number
  onRate?: (rating: number) => void
}

export default function StarRating({
  maxRating = 5,
  defaultRating = 0,
  color = "#fcc418",
  size = 48,
  messages,
  onRate = () => {},
  ...props
}: IStarRatingProps) {
  const DEFAULT_RATING = Math.min(defaultRating, maxRating)
  const [rating, setRating] = useState(DEFAULT_RATING)
  const [hoverRating, setHoverRating] = useState(0)

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    color,
  }

  const starContainerStyle: CSSProperties = {
    display: "flex",
  }

  const textStyle: CSSProperties = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
    textTransform: "capitalize",
  }

  function handleRatingClick(value: number) {
    setRating(value)
    onRate(value)
  }

  //Start region################ Handle messages ################
  let processedMessages: Array<string> = []
  if (messages && messages.length > 0) {
    processedMessages = messages
    if (messages.length < maxRating) {
      processedMessages = [
        ...messages,
        ...Array.from(
          { length: maxRating - messages.length },
          () => processedMessages[processedMessages.length - 1]
        ),
      ]
    }
  } else {
    processedMessages = Array.from({ length: maxRating }, (_, i) =>
      (i + 1).toString()
    )
  }

  const message = processedMessages[(hoverRating || rating) - 1] ?? ""
  //End region################ Handle messages ################

  return (
    <div style={containerStyle} {...props}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => {
          const starValue = i + 1
          const isFull = starValue <= (hoverRating || rating)

          return (
            <Star
              key={i}
              width={size}
              height={size}
              fill="currentColor"
              stroke="currentColor"
              isFull={isFull}
              onRate={() => handleRatingClick(starValue)}
              onRateHoverIn={() => setHoverRating(starValue)}
              onRateHoverOut={() => setHoverRating(0)}
            />
          )
        })}
      </div>
      <p style={textStyle}>{message}</p>
    </div>
  )
}

interface IStarProps extends SVGAttributes<SVGElement> {
  isFull: boolean
  onRate: () => void
  onRateHoverIn: () => void
  onRateHoverOut: () => void
}

function Star({
  isFull,
  onRate,
  onRateHoverIn,
  onRateHoverOut,
  ...props
}: IStarProps) {
  const starStyle: CSSProperties = {
    display: "inline-block",
    cursor: "pointer",
  }

  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onRateHoverIn}
      onMouseLeave={onRateHoverOut}
      role="button"
      aria-label="Star rating"
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#000"
          stroke="#000"
          role="presentation"
          {...props}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="#000"
          role="presentation"
          {...props}
          fill="none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  )
}
