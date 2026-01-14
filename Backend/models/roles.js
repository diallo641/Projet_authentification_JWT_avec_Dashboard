const mongoose = require('mongoose');

const roleSchema = mongoose.Schema(
    {
        nom:
        {
            type: String,
            enum: ["Admin", "Client", "Manager"], default: "Client",
            trim:true,
            required:true,
            unique: true
        },
        description:
        {
            type: String,
            trim: true,
            required: true
        }
    },
    {timestamps: true}
);

module.exports= mongoose.model("Roles", roleSchema);