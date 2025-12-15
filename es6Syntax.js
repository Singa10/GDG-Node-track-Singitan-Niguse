import express from "express";

const app = express();
const PORT = 3000;

app.get("/home", (req, res) => {
    res.send('<h1 style="color: green;">Welcome to the Home Page!</h1>');
});

app.get("/about", (req, res) => {
    res.send("this is about us page");
});

app.get("/students/:studentid", (req, res) => {
    const { studentid } = req.params;
    const { departement } = req.query;

    const student={
        id: studentid,
        name:`student ${studentid}`,
        departement: departement || 'Not specified',
        email:`student${studentid}@gmail.com}`
    };
    res.json(student);
})
app.listen(PORT, () => {
    consolde.log(`Server is running on http://localhost:${PORT}`);
});