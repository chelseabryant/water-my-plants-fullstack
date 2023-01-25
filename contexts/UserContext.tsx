import * as React from "react"
import { useState, useContext } from "react"
import { IUser } from "../interfaces"

/* type is another way of doing interfaces, just not as global. We named this "interface" userProviderProps
and the type is childen, which is a react method of sorts. Need this to be able to add children as a
parameter to funtions within this file. */
type userProviderProps = { children: React.ReactNode }

/* This defines what UserContext is, it is a react function/method and with typescript we need to define what the
values could be. Which is: either the object {user, setUser} or undefined. 
TODO: why do we need the last (undefined)? */
const UserContext = React.createContext<
  | { user: IUser; setUser: React.Dispatch<React.SetStateAction<IUser>> }
  | undefined
>(undefined)

/* Provider: This context provider component is exported so it can wrap any page, component,
or the global app component to provide the context data and functions provided.

On app page "children" is  <Component {...pageProps} />  This is all the files under app wrapped inside
a userprovider <> */
function UserProvider({ children }: userProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)
  const value = { user, setUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/* We export the useUser hook so the context object is easily consumable by components wrapped
in the provider */
function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export { UserProvider, useUser }
