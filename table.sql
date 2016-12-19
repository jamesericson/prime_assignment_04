CREATE TABLE todolist (
  id SERIAL PRIMARY KEY NOT NULL,
  item TEXT,
  completed BOOLEAN DEFAULT FALSE,
  importance INTEGER DEFAULT '1'
);

INSERT INTO todolist (item) VALUES ('set up a server');
INSERT INTO todolist (item) VALUES ('create an input');
INSERT INTO todolist (item) VALUES ('set up js logic to recieve the input');
INSERT INTO todolist (item) VALUES ('ajax post to server/db');
INSERT INTO todolist (item) VALUES ('add ajax to get from server/db');
INSERT INTO todolist (item) VALUES ('recieve and display to dom');
INSERT INTO todolist (item) VALUES ('add functions for delete/completed buttons');
INSERT INTO todolist (item) VALUES ('connect functions to server/db');
INSERT INTO todolist (item) VALUES ('have a beer');
