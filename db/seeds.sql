INSERT INTO departments (department_name)
VALUES 
  ('Finance'),
  ('Legal'),
  ('Cafeteria'),
  ('Marketing');

INSERT INTO roles (id, title, salary, department_id)
VALUES 
  (1, Manager, 70000, 1),
  (2, Artist, 200000, 4),
  (3, LunchLady, 100000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('James', 'Fraser', 2, 1),
  ('Jack', 'London', 1, 1),
  ('Robert', 'Bruce', 3, 1),
  ('Peter', 'Greenaway', 2, 1),
  ('Derek', 'Jarman', 1, 1, 1),
  ('Paolo', 'Pasolini', 1, 1),
  ('Heathcote', 'Williams', 3, 1);