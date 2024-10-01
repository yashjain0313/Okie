import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpass, setconfirmpass] = useState("")
  const handleLogin =async ()=>{}
  const handleSignup =async ()=>{}
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div
        className="h-[80vh] bg-white  border-2 border-white text-opacity-90 shadow-2xl w-[80vw]
        md:w-[90vw] lg:w-[70vw] xl:w-[60vw] 2xl:w-[25vw] rounded-3xl grid xl:grid-cols-2"
      >
        <div className=" flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl font-bold ml-17 md:text-6xl ">Welcome</h1>
              <img src={Victory} alt="victory" className="h-[14vh]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with Okie !
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="rounded-none bg-transparent w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]: bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
                data-[state=active]:text-black 
                data-[state=active]:font-semibold 
                data-[state=active]:border-b-purple-500
                p-3 transition-all duration-300"
                >
                  {" "}
                  Log In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]: bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full 
                 data-[state=active]:text-black 
                 data-[state=active]:font-semibold 
                 data-[state=active]:border-b-purple-500
                 p-3 transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-3 mt-4" value="login">
                <Input placeholder="Email" type="email" className="rounded-xl p-6" value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}/>
                 <Input placeholder="Password" type="password" className="rounded-xl p-6" value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}/>

                <Button onClick={handleLogin} className="mt-3">Log In</Button>
              
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-3 ">

              <Input placeholder="Email" type="email" className="rounded-xl p-6" value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}/>
                 <Input placeholder="Password" type="password" className="rounded-xl p-6" value={password}
                onChange={(e)=>{
                  setpassword(e.target.value)
                }}/>

              <Input placeholder="Confirm Password" type="password" className="rounded-xl p-6" value={confirmpass}
                onChange={(e)=>{
                  setconfirmpass(e.target.value)
                }}/>
              
              <Button className="rounded-xl mt-2" onClick={handleSignup}>Sign up</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className=" hidden xl:flex justify-center items-center">
          <img src={Background} alt="background" className="h-[80vh] w-[80vw] object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default Auth;
