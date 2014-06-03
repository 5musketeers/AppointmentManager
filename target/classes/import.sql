--
-- JBoss, Home of Professional Open Source
-- Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
-- contributors by the @authors tag. See the copyright.txt in the
-- distribution for a full listing of individual contributors.
--
-- Licensed under the Apache License, Version 2.0 (the "License");
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
-- http://www.apache.org/licenses/LICENSE-2.0
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--

-- You can use this file to load seed data into the database using SQL statements
-- insert into Member_html5mobi (id, name, email, phone_number) values (0, 'John Smith', 'john.smith@mailinator.com', '2125551212')
INSERT INTO Appointment_html5mobi (`id`, `title`, `start`, `end`, `type`, `isPrivate`, `owner`, `location`) VALUES ('1', 'Persistent Appointment', 'today', 'tomorrow', 'initApp', '0', '5musk', 'TUD')
INSERT INTO Researcher_html5mobi (`id`, `name`, `email`, `password`) VALUES ('1', 'Franz', 'test@test.de', 'test')
INSERT INTO Researcher_html5mobi (`id`, `name`, `email`, `password`) VALUES ('2', 'Peter', 'test2@test.de', 'test')
INSERT INTO ResearcherGroup_html5mobi (`id`, `name`) VALUES ('1', '5musketeers')
