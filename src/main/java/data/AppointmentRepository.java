/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package data;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import model.Appointment;

import java.util.List;

@ApplicationScoped
public class AppointmentRepository {

    @Inject
    private EntityManager em;

    public Appointment findById(Long id) {
        return em.find(Appointment.class, id);
    }

    public List<Appointment> findAllOrderedByName() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Appointment> criteria = cb.createQuery(Appointment.class);
        Root<Appointment> appointment = criteria.from(Appointment.class);
        criteria.select(appointment).orderBy(cb.asc(appointment.get("title")));
        return em.createQuery(criteria).getResultList();
    }
    
}
