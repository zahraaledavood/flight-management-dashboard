const API_URL = "https://jsonplaceholder.typicode.com";

type LoginData = {
    email:string
    password:string
}

type AuthResponse = {
    success: boolean
    error?: string
}

type SignupData = {
    name:string
    email:string
    password:string
}

class AuthService {
    async login(data: LoginData): Promise<AuthResponse>{
        try{
            const response = await fetch(`${API_URL}/posts`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: data.email,
                    password: data.password
                })
            })

            if (response.ok){
                const result = await response.json()
                // Save Token
                localStorage.setItem("user", JSON.stringify(result))
                return {success: true}
            } else {
                return {
                    success: false,
                    error: "Invalid credetials"
                }
            }
        } catch {
            return {
                success: false,
                error: "Network error"
            }
        }
    }

    async Signup(data: SignupData) : Promise<AuthResponse>{
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
            })

            if (response.ok){
                const result = await response.json()
                localStorage.setItem("user", JSON.stringify(result))
                return { success : true }
            } else {
                return {
                    success: false,
                    error: "Sign up failed"
                }
            }
        } catch {
            return {
                success : false,
                error: "Network error"
            }
        }
    }

    logout(): void{
        localStorage.removeItem("user")
    }

    getCurrentUser(){
        const user = localStorage.getItem("user")
        return user? JSON.parse(user): null
    }
}

export default new AuthService()