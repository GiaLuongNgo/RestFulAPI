-- Up 

CREATE TABLE students (
    id INTEGER PRIMARY KEY NOTNULL AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT
);
CREATE TABLE teachers (
    id INTEGER PRIMARY KEY NOTNULL AUTOINCREMENT,
    firstname TEXT,
    lastname TEXT
);
CREATE TABLE classes (
    id INTEGER PRIMARY KEY NOTNULL AUTOINCREMENT,
    code TEXT,
    name TEXT,
    teacher_id INTEGER,
    start_date TEXT,
    end_date TEXT,
    FOREIGN KEY ([teacher_id]) REFERENCES "teachers" ([id])
     ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE student_classes (
    class_id INTEGER,
    student_id INTEGER,
      CONSTRAINT [PK_studentclass] PRIMARY KEY  ([class_id], [student_id]),
    FOREIGN KEY ([class_id]) REFERENCES "classes" ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY ([student_id]) REFERENCES "students" ([id])
    ON DELETE NO ACTION ON UPDATE NO ACTION
);
-- Down
DROP TABLE students;
DROP TABLE teachers;
DROP TABLE classes;
DROP TABLE student_classes;
