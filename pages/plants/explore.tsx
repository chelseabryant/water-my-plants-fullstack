import Link from "next/link"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { IFullPlant } from "../../interfaces"
import styles from "../../styles/Explore.module.css"

export default function Explore() {
  const [fullPlants, setFullPlants] = useState<IFullPlant[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}/a/plants`,
          {
            method: "GET",
          }
        )
        const data = await response.json()
        setFullPlants(data)
      } catch (e) {
        console.log("HIT CATCH: ", e)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Header />
      <h3>Explore Plants</h3>

      {fullPlants.map((plant) => (
        <Link key={plant.id} href={`/plants/${plant.id}`}>
          <div>
            <img src={plant.image} alt="" className={styles["plant-image"]} />
            <span>{plant.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
