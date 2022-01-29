INSERT INTO departments (id, department_name)
VALUES
  (1, Finance),
  (2, Legal),
  (3, Cafeteria),
  (4, Marketing)

INSERT INTO roles (id, title, salary, department_id)
VALUES
  (1, Manager, 70000, 1)
  (2, Artist, 200000, 4)
  (3, LunchLady, 100000, 3)

  INSERT INTO employees (id,first_name, last_name, role_id, manager_id)
VALUES
  (1, 'James', 'Fraser', 2),
  (2, 'Jack', 'London', 1),
  (3, 'Robert', 'Bruce', 3),
  (4, 'Peter', 'Greenaway', 2),
  (5, 'Derek', 'Jarman', 1),
  (6, 'Paolo', 'Pasolini', 1),
  (7, 'Heathcote', 'Williams', 3),