INSERT INTO tbl_attendee_types(
    a_type_id,
    attendee_type
) VALUES
      (1,'Intern'),
      (2,'Fresher'),
      (3,'Online fee-fresher'),
      (4,'Offline fee-fresher');
INSERT INTO  tbl_attendee(
    accepted,
    planned,
    actual,
    a_type_id
) VALUES
      (10,9,8,1),
      (10,9,8,1),
      (10,9,8,2),
      (10,9,8,2),
      (10,9,8,3),
      (10,9,8,3),
      (10,9,8,4),
      (10,9,8,4),
      (10,9,8,1),
      (10,9,8,1);
INSERT INTO tbl_user_permission
(role, class, learning_material, syllabus, user_management, training_program)
VALUES
    ('SUPER_ADMIN', 'FULL_ACCESS', 'FULL_ACCESS', 'FULL_ACCESS', 'FULL_ACCESS', 'FULL_ACCESS'),
    ('ADMIN', 'FULL_ACCESS', 'FULL_ACCESS', 'FULL_ACCESS', 'VIEW', 'FULL_ACCESS'),
    ('TRAINER', 'VIEW', 'MODIFY', 'VIEW', 'VIEW', 'VIEW'),
    ('STUDENT', 'VIEW', 'VIEW', 'VIEW', 'VIEW', 'VIEW');

INSERT INTO tbl_user (
    create_by,
    create_date,
    dob,
    email,
    password,
    gender,
    modified_by,
    modified_date,
    name,
    phone,
    status,
    role
) VALUES
      ('Admin User', '2023-10-04', '1990-01-15', 'admin@example.com', 'AnBaToCom@123', 'Male', 'Admin User', '2023-10-04', 'Admin User', '0234567890', true, 1),
      ('Admin User', '2023-10-04', '1985-05-20', 'instructor@example.com', 'AnBaToCom@123', 'Female', 'Admin User', '2023-10-04', 'Admin', '0876543210', true, 2),
      ('Admin User', '2023-10-04', '1998-09-03', 'trainer@example.com', 'AnBaToCom@123', 'Male', 'Admin User', '2023-10-04', 'Trainer', '0239876543', true, 3),
      ('Admin User', '2023-10-04', '1995-02-28', 'student2@example.com', 'AnBaToCom@123', 'Female', 'Admin User', '2023-10-04', 'Student 2', '0890123456', true, 4),
      ('Admin User', '2023-10-04', '1992-11-10', 'student3@example.com', 'AnBaToCom@123', 'Male', 'Admin User', '2023-10-04', 'Student 3', '0345678901', true, 4),
      ('Admin User', '2023-10-04', '1994-04-05', 'student4@example.com', 'AnBaToCom@123', 'Female', 'Admin User', '2023-10-04', 'Student 4', '0789012345', true, 4),
      ('Admin User', '2023-10-04', '1991-07-20', 'student5@example.com', 'AnBaToCom@123', 'Male', 'Admin User', '2023-10-04', 'Student 5', '0456789012', true, 4),
      ('Admin User', '2023-10-04', '1993-03-15', 'student6@example.com', 'AnBaToCom@123', 'Female', 'Admin User', '2023-10-04', 'Student 6', '0567890123', true, 4),
      ('Admin User', '2023-10-04', '1997-08-25', 'student7@example.com', 'AnBaToCom@123', 'Male', 'Admin User', '2023-10-04', 'Student 7', '0678901234', true, 4),
      ('Test User', '2023-10-04', '1996-06-30', 'test@example.com', '$2a$10$n7nBnHiYNS8AcaMyKcQd4OSgTjCVX3o/lc2IKWgQygtMf65QT3MUG', 'Female', 'Tester', '2023-10-04', 'Student 8', '0864456789', true, 4);

INSERT INTO tbl_syllabus (
    topic_code,
    create_by,
    create_date,
    modified_by,
    modified_date,
    priority,
    public_status,
    technical_group,
    topic_name,
    topic_outline,
    training_audience,
    training_materials,
    training_principles_training,
    training_principles_retest,
    training_principles_marking,
    training_principles_criteria,
    training_principles_others,
    version,
    attendee_number,
    status,
    assessment_scheme
) VALUES
      ('T001', 'Admin User', '10-04-2023', 'Admin User', '10-04-2023', 'HIGH', 'PUBLIC', 'Technical Group A', 'Topic 1', 'Outline for Topic 1', 30, 'Materials for Topic 1',
      'Trainee who actively complete online learning according to MOOC links provided',
      'Only allow each student to retake the test up to 2 times',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.0',13,'Active','15,15,70,40,60,70'),
      ('T002', 'Admin User', '10-04-2023', 'Admin User', '10-04-2023', 'MEDIUM', 'PUBLIC', 'Technical Group B', 'Topic 2', 'Outline for Topic 2', 20, 'Materials for Topic 2',
      'At the end of the day, students complete Daily Quiz for 30 minutes',
      'Re-exam the same structure as the Final Test',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.1',12,'Inactive','15,15,70,40,60,70'),
      ('T003', 'Admin User', '10-04-2023', 'Admin User', '10-04-2023', 'LOW', 'PRIVATE', 'Technical Group C', 'Topic 3', 'Outline for Topic 3', 25, 'Materials for Topic 3',
      'Trainer/Mentor supports answering questions, guiding exercises 1.5-2.0h/day',
      'Only allow each student to retake the test up to 2 times',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.2',20,'Active','15,15,70,40,60,70'),
      ('T004', 'Admin User', '10-04-2023', 'Admin User', '10-04-2023', 'HIGH', 'PUBLIC', 'Technical Group A', 'Topic 4', 'Outline for Topic 4', 30, 'Materials for Topic 4',
      'Trainer conduct the workshops',
      'Re-exam the same structure as the Final Test',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.3',21,'Inactive','15,15,70,40,60,70'),
      ('T005', 'Admin User', '10-04-2023', 'Admin User', '10-04-2023', 'MEDIUM', 'PUBLIC', 'Technical Group B', 'Topic 5', 'Outline for Topic 5', 20, 'Materials for Topic 5',
      'Trainees complete Assignments and Labs',
      'Only allow each student to retake the test up to 2 times',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day','Version 1.4',17,'Draft','15,15,70,40,60,70'),
      ('T006', 'Admin User', '10-05-2023', 'Admin User', '10-05-2023', 'LOW', 'PRIVATE', 'Technical Group C', 'Topic 6', 'Outline for Topic 6', 25, 'Materials for Topic 6',
      'Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice)',
      'Re-exam the same structure as the Final Test',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.5',15,'Draft','15,15,70,40,60,70'),
      ('T007', 'Admin User', '10-05-2023', 'Admin User', '10-05-2023', 'HIGH', 'PUBLIC', 'Technical Group A', 'Topic 7', 'Outline for Topic 7', 30, 'Materials for Topic 7',
      'Trainee who actively complete online learning according to MOOC links provided',
      'Re-exam the same structure as the Final Test',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.6',24,'Active','15,15,70,40,60,70'),
      ('T008', 'Admin User', '10-06-2023', 'Admin User', '10-06-2023', 'MEDIUM', 'PUBLIC', 'Technical Group B', 'Topic 8', 'Outline for Topic 8', 20, 'Materials for Topic 8',
      'Trainee who actively complete online learning according to MOOC links provided',
      'Only allow each student to retake the test up to 2 times',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
      'Version 1.7',18,'Inactive','15,15,70,40,60,70'),
      ('T009', 'Admin User', '10-06-2023', 'Admin User', '10-06-2023', 'LOW', 'PRIVATE', 'Technical Group C', 'Topic 9', 'Outline for Topic 9', 25, 'Materials for Topic 9',
      'Trainee who actively complete online learning according to MOOC links provided',
      'Only allow each student to retake the test up to 2 times',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day', 'Version 1.8',16,'Active','15,15,70,40,60,70'),
      ('T010', 'Admin User', '10-06-2023', 'Admin User', '10-06-2023', 'HIGH', 'PUBLIC', 'Technical Group A', 'Topic 10', 'Outline for Topic 10', 30, 'Materials for Topic 10',
      'Trainee who actively complete online learning according to MOOC links provided',
      'Re-exam the same structure as the Final Test',
      'Trainer marks the Final Exam Practice',
      'Students pass the quick test',
      'Trainers can allow students to complete homework and submit the next day',
       'Version 1.9',15,'Active','15,15,70,40,60,70');

INSERT INTO tbl_training_program (
    training_program_code,
    create_by,
    create_date,
    duration,
    modified_by,
    modified_date,
    name,
    star_time,
    status,
    general_inf,
    user_id
) VALUES
      ('TP001', 'Admin User', '10-04-2023', 30, 'Admin User', '10-04-2023', 'Program 1', '2023-11-01', 'ACTIVE', 'T001', 1),
      ('TP002', 'Admin User', '10-04-2023', 45, 'Admin User', '10-04-2023', 'Program 2', '2023-11-15', 'ACTIVE', 'T002', 2),
      ('TP003', 'Admin User', '10-04-2023', 60, 'Admin User', '10-04-2023', 'Program 3', '2023-11-30', 'ACTIVE', 'T003', 3),
      ('TP004', 'Admin User', '10-04-2023', 50, 'Admin User', '10-04-2023', 'Program 4', '2023-11-25', 'ACTIVE', 'T004', 4),
      ('TP005', 'Admin User', '10-04-2023', 55, 'Admin User', '10-04-2023', 'Program 5', '2023-12-10', 'ACTIVE', 'T005', 5),
      ('TP006', 'Admin User', '10-05-2023', 45, 'Admin User', '10-05-2023', 'Program 6', '2023-11-15', 'ACTIVE', 'T006', 6),
      ('TP007', 'Admin User', '10-05-2023', 40, 'Admin User', '10-05-2023', 'Program 7', '2023-11-05', 'ACTIVE', 'T007', 7),
      ('TP008', 'Admin User', '10-06-2023', 60, 'Admin User', '10-06-2023', 'Program 8', '2023-12-01', 'ACTIVE', 'T008', 8),
      ('TP009', 'Admin User', '10-06-2023', 45, 'Admin User', '10-06-2023', 'Program 9', '2023-11-15', 'ACTIVE', 'T009', 9),
      ('TP010', 'Admin User', '10-06-2023', 50, 'Admin User', '10-06-2023', 'Program 10', '2023-12-01', 'ACTIVE', 'T010', 10);

INSERT INTO tbl_training_program_syllabus (
    sequence,
    topic_code,
    training_program_code
) VALUES
      ('A01', 'T001', 'TP001'),
      ('A02', 'T002', 'TP001'),
      ('S01', 'T003', 'TP002'),
      ('S02', 'T004', 'TP002'),
      ('K01', 'T005', 'TP003'),
      ('K02', 'T006', 'TP003'),
      ('H01', 'T007', 'TP004'),
      ('H02', 'T008', 'TP004'),
      ('A03', 'T009', 'TP005'),
      ('A04', 'T010', 'TP005');

INSERT INTO tbl_class (
    class_code,
    class_name,
    create_by,
    create_date,
    duration,
    end_date,
    fsu,
    location,
    class_time,
    modified_by,
    modified_date,
    start_date,
    status,
    training_program_code,
    attendee_id
) VALUES
      ( 'C101', 'Introduction to Programming', 'Admin User', '2023-10-04', 30, '2023-11-03', 'FHM', 'Room A101','Morning', 'Admin User', '2023-10-04', '2023-10-15', 'ACTIVE', 'TP001',1),
      ( 'C102', 'Database Management', 'Admin User', '2023-10-04', 45, '2023-11-15', 'FHM', 'Room B202','Morning','Admin User', '2023-10-04', '2023-10-20', 'OPENING', 'TP002',2),
      ( 'C103', 'Web Development', 'Admin User', '2023-10-04', 60, '2023-11-30', 'FHM', 'Room C303', 'Noon','Admin User', '2023-10-04', '2023-10-25', 'ACTIVE', 'TP003',3),
      ( 'C104', 'Data Science', 'Admin User', '2023-10-04', 50, '2023-11-25', 'FHM', 'Room D404', 'Noon','Admin User', '2023-10-04', '2023-11-01', 'ACTIVE', 'TP004',4),
      ( 'C105', 'Machine Learning', 'Admin User', '2023-10-04', 55, '2023-12-10', 'FHM', 'Room E505', 'Night','Admin User', '2023-10-04', '2023-11-05', 'ACTIVE', 'TP005',5),
      ( 'C106', 'Artificial Intelligence', 'Admin User', '2023-10-04', 45, '2023-11-15', 'FHM', 'Room F606','Night', 'Admin User', '2023-10-04', '2023-11-10', 'ACTIVE', 'TP006',6),
      ( 'C107', 'Cybersecurity', 'Admin User', '2023-10-04', 40, '2023-11-05', 'FHM', 'Room G707','Online', 'Admin User', '2023-10-04', '2023-11-15', 'ACTIVE', 'TP007',7),
      ( 'C108', 'Software Engineering', 'Admin User', '2023-10-04', 60, '2023-12-01', 'FHM', 'Room H808','Online', 'Admin User', '2023-10-04', '2023-12-05', 'ACTIVE', 'TP008',8),
      ( 'C109', 'Mobile App Development', 'Admin User', '2023-10-04', 45, '2023-11-15', 'FHM', 'Room I909','Morning', 'Admin User', '2023-10-04', '2023-11-20', 'ACTIVE', 'TP009',9),
      ( 'C110', 'Cloud Computing', 'Admin User', '2023-10-04', 50, '2023-11-20', 'FHM', 'Room J1010','Morning', 'Admin User', '2023-10-04', '2023-11-25', 'ACTIVE', 'TP010',10);

INSERT INTO tbl_class_user (
    user_type,
    class_id,
    user_id
) VALUES
      ('ADMIN', 1, 2),
      ('TRAINER', 1, 3),
      ('STUDENT', 1, 4),
      ('ADMIN', 2, 1),
      ('TRAINER', 2, 3),
      ('STUDENT', 2, 5),
      ('ADMIN', 3, 1),
      ('TRAINER', 3, 3),
      ('STUDENT', 3, 7),
      ('STUDENT', 3, 8);

INSERT INTO tbl_learning_objective (
    code,
    description,
    name,
    type
) VALUES
      ('LO1', 'Description for LO1', 'Learning Objective 1', 'Type A'),
      ('LO2', 'Description for LO2', 'Learning Objective 2', 'Type B'),
      ('LO3', 'Description for LO3', 'Learning Objective 3', 'Type A'),
      ('LO4', 'Description for LO4', 'Learning Objective 4', 'Type B'),
      ('LO5', 'Description for LO5', 'Learning Objective 5', 'Type A'),
      ('LO6', 'Description for LO6', 'Learning Objective 6', 'Type B'),
      ('LO7', 'Description for LO7', 'Learning Objective 7', 'Type A'),
      ('LO8', 'Description for LO8', 'Learning Objective 8', 'Type B'),
      ('LO9', 'Description for LO9', 'Learning Objective 9', 'Type A'),
      ('LO10', 'Description for LO10', 'Learning Objective 10', 'Type B');

INSERT INTO tbl_syllabus_objective (
    objective_code,
    topic_code
) VALUES
      ('LO1', 'T001'),
      ('LO2', 'T002'),
      ('LO3', 'T003'),
      ('LO4', 'T004'),
      ('LO5', 'T005'),
      ('LO6', 'T006'),
      ('LO7', 'T007'),
      ('LO8', 'T008'),
      ('LO9', 'T009'),
      ('LO10', 'T010');

INSERT INTO tbl_training_unit (
    unit_code,
    day_number,
    topic_code,
    unit_name,
    unit_number
) VALUES
      ('U1', 1, 'T001', 'Unit 1', '1'),
      ('U2', 2, 'T002', 'Unit 2', '1'),
      ('U3', 3, 'T003', 'Unit 3', '1'),
      ('U4', 4, 'T004', 'Unit 4', '1'),
      ('U5', 5, 'T005', 'Unit 5', '1'),
      ('U6', 6, 'T006', 'Unit 6', '1'),
      ('U7', 7, 'T007', 'Unit 7', '1'),
      ('U8', 8, 'T008', 'Unit 8', '1'),
      ('U9', 9, 'T009', 'Unit 9', '1'),
      ('U10', 10, 'T010', 'Unit 10', '1');

INSERT INTO tbl_training_content (
    content,
    delivery_type,
    duration,
    note,
    training_format,
    output_standard,
    learning_objective_code,
    unit_code
) VALUES
      ('Content for Unit 1', 'ASSIGNMENT_LAB', 60, 'Note for Unit 1', 'ONLINE', 'HS4D', 'LO1', 'U1'),
      ('Content for Unit 2', 'CONCEPT_LECTURE', 45, 'Note for Unit 2', 'OFFLINE', 'K4SD', 'LO2', 'U2'),
      ('Content for Unit 3', 'GUIDES_REVIEW', 50, 'Note for Unit 3', 'ONLINE', 'H6SD', 'LO3', 'U3'),
      ('Content for Unit 4', 'TEST_QUIZ', 40, 'Note for Unit 4', 'OFFLINE', 'H4SD', 'LO4', 'U4'),
      ('Content for Unit 5', 'EXAM', 55, 'Note for Unit 5', 'ONLINE', 'H4SD', 'LO5', 'U5'),
      ('Content for Unit 6', 'SEMINAR_WORKSHOP', 60, 'Note for Unit 6', 'OFFLINE', 'K4SD', 'LO6', 'U6'),
      ('Content for Unit 7', 'ASSIGNMENT_LAB', 45, 'Note for Unit 7', 'ONLINE', 'H6SD', 'LO7', 'U7'),
      ('Content for Unit 8', 'TEST_QUIZ', 50, 'Note for Unit 8', 'OFFLINE', 'H6SD', 'LO8', 'U8'),
      ('Content for Unit 9', 'TEST_QUIZ', 60, 'Note for Unit 9', 'ONLINE', 'K4SD', 'LO9', 'U9'),
      ('Content for Unit 10', 'CONCEPT_LECTURE', 70, 'Note for Unit 10', 'OFFLINE', 'H4SD', 'LO10', 'U10');

