package cit.edu.rootusermobile.features.auth.data

data class User(
    val id: Long? = null,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String? = null, // Backend won't send password in response normally, but used for registration
    val phone: String? = null,
    val role: String = "USER"
)

data class LoginRequest(
    val email: String,
    val password: String
)
