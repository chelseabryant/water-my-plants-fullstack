import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { IFullPlant } from "../../interfaces"
import styles from "../../styles/Explore.module.css"
import { useUser } from "../../contexts/UserContext"

export default function PlantDetails() {
  const [plant, setPlant] = useState<IFullPlant>({} as IFullPlant)
  const router = useRouter()
  const { user, setUser } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}/a/plants/${router.query.id}`,
          {
            method: "GET",
          }
        )
        const data = await response.json()
        setPlant(data[0])
      } catch (e) {
        console.log("HIT CATCH: ", e)
      }
    }
    fetchData()
  }, [])

  const onAddClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}/a/plants/add_plant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user.id,
            plant: plant.id,
          }),
        }
      )
      const data = await response.json()
      console.log("THIS DATA: ", data)
    } catch (e) {
      console.log("HIT CATCH: ", e)
    }
  }

  return (
    <div>
      <Header />
      <img src={plant.image} alt="" className={styles["plant-image"]} />
      <ul>
        <h2>{plant.name}</h2>
        <li>Botanical name: {plant.botanical}</li>
        <li>Sunlight: {plant.sun}</li>
        <li>Watering: {plant.water}</li>
        <li>Fertilize: {plant.fertilize}</li>
        <li>Temperature tolerance: {plant.temperature}</li>
        <li>Humidity: {plant.humidity}</li>
      </ul>
      {user.id && <button onClick={onAddClick}>Add plant to My Plants</button>}
      <br />
      <Footer />
    </div>
  )
}
