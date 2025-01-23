import './chart.style.scss'
import { useEffect, useRef } from "react";

function Chart({data}) {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resizeCanvas = ()=>{

      const parentWidth = canvas.parentElement.offsetWidth
      canvas.width =  parentWidth * 0.9
      canvas.height = 200

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let x = 20
      let y = canvas.height - 50

      ctx.strokeStyle = "#4682B4"
      ctx.fillStyle = "#4682B4"

      ctx.beginPath()
      data.forEach((d) => {
        ctx.lineTo(x, y - d.temp)
        ctx.moveTo(x, y - d.temp)
        ctx.arc(x, y - d.temp, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        x += canvas.width / data.length
      })

    }

    resizeCanvas()

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };

  },[data])
  

  return (<>
    <canvas
        ref={canvasRef}
        style={{
          display: "block",
          margin: "0 auto",
        }}
    />
    <div className='Weather-icons'>
      {data.map((elem, index) => {
        return <div key={index}>
          <p>{elem.time.getHours()}:00</p>
          <img src={elem.icon} alt='alt="weather icon'/>
          <p>{elem.temp}°C</p>
        </div>
      })}
    </div>
  </>)
}

export default Chart