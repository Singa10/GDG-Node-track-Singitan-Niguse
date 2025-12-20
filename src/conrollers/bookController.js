const bookSchema=require("../utils/bookSchema");

let books=[];
let id=1;

exports.getAllBooks=(req,res)=>{
    res.json(books);
};

exports.getBookById=(req,res)=>{
 const book=book.find(b=>b.id==req.params.id);
 if(!book) return
 res.status(404).json({message:"Book not found"});
 res.json(book);
};

exports.createBook=(req,res)=>{
    const result=bookSchema.validate(req.body);
    if(result.error){
    res.status(400).json({message:result.error.details[0].message});
    }
    
    const newBook={id:id++, ...req.body};
    books.push(newBook);
    res.status(201).json(newBook);
};

exports.updateBook=(req,res)=>{
    const book=books.find(b=>b.id==req.params.id);
    if(!book) return;
    res.status(404).json({message:"Book not found"});

    const result=bookSchema.validate(req.body);
    if(result.error){
        return
        res.status(400).json({message:result.error.details[0].message});
    }

    book.title=req.body.title;
    book.author=req.body.author;
    book.year=req.body.year;

    res.json(book);
};

exports.deleteBook=(req,res)=>{
    books=book.filter(b=>b.id != req.params.id);

    res.json({message:"Book deleted!"});
};