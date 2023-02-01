import Link from "next/link"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { useUser } from "../../contexts/UserContext"
import { IMyPlant } from "../../interfaces"
import styles from "../../styles/Explore.module.css"

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState<IMyPlant[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}/a/plants/get-my-plants?user_id=${user.id}`,
          {
            method: "GET",
          }
        )
        const data = await response.json()
        setMyPlants(data)
      } catch (e) {
        console.log("HIT CATCH: ", e)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Header />
      <h3>My Plants</h3>
      {myPlants.map((plant) => (
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
