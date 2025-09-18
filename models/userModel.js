class User {
  constructor(username, password) {
    this.id = User.generateId();
    this.username = username;
    this.password = password;
  }

  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

//   update(updates) {
//     const allowedUpdates = ["preferences"];

//     Object.keys(updates).forEach((key) => {
//       if (allowedUpdates.includes(key)) {
//         if (key === "preferences") {
//           // Only update valid subfields inside preferences
//           const allowedPref = ["category", "country", "language"];
//           this.preferences = {
//             ...this.preferences,
//             ...Object.fromEntries(
//               Object.entries(updates.preferences || {}).filter(([k]) =>
//                 allowedPref.includes(k)
//               )
//             ),
//           };
//         } else {
//           this[key] = updates[key];
//         }
//       }
//     });

//     this.updatedAt = new Date().toISOString();
//     return this;
//   }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
    };
  }
}

module.exports = User;
