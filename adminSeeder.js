const bcrypt = require('bcrypt');

const adminSeeder = async(User) => {
    try {
        // Check whether admin exists or not
        const isAdminExists = await User.findAll({ where: { email: "admin@gmail.com" } });

        if (isAdminExists.length == 0) {
            // Create admin user if it doesn't exist
            await User.create({
                username: "Admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync(process.env.ADMIN_PASS, 10),
                phoneNumber: "984204646",
                role: "Admin",
                jobTitle: "null",
                province: "null",
                district: "null",
                city: "null",
                isVerified : true
            });

            console.log("Admin seeded successfully");
        } else {
            console.log("Admin already seeded");
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
};

module.exports = adminSeeder;