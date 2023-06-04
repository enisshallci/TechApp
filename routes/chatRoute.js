/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management
 */
/**
 * @swagger
 * /users:
 *   put:
 *     summary: Get or create a user
 *     description: Creates a new user if it doesn't exist or retrieves an existing user from the ChatEngine API.
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               secret:
 *                 type: string
 *                 description: The secret used for authentication.
 *     responses:
 *       '200':
 *         description: User data retrieved or created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define the properties of the user data here
 *       '500':
 *         description: Internal server error.
 */

function getOrCreateUser(callback) {
  axios
    .put(
      "https://api.chatengine.io/users/",
      { username: email, email: email, secret: email },
      { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
    )
    .then((r) => callback(r.data))
    .catch((e) => console.log("Get or create user error", e));
}

/**
 * @swagger
 * /chats:
 *   put:
 *     summary: Get or create a chat
 *     description: Creates a new chat if it doesn't exist or retrieves an existing chat from the ChatEngine API.
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernames:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of usernames participating in the chat.
 *               is_direct_chat:
 *                 type: boolean
 *                 description: A flag indicating whether the chat is a direct chat or not.
 *     responses:
 *       '200':
 *         description: Chat data retrieved or created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Define the properties of the chat data here
 *       '500':
 *         description: Internal server error.
 */

function getOrCreateChat(callback) {
  axios
    .put(
      "https://api.chatengine.io/chats/",
      { usernames: [email, "Admin"], is_direct_chat: true },
      {
        headers: {
          "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
          "User-Name": email,
          "User-Secret": email,
        },
      }
    )
    .then((r) => callback(r.data))
    .catch((e) => console.log("Get or create chat error", e));
}
