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
package service;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import model.Appointment;

import java.util.logging.Logger;
import java.util.Calendar;

// The @Stateless annotation eliminates the need for manual transaction demarcation
@Stateless
public class AppointmentRegistration {

    @Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<Appointment> appEventSrc;

    public void register(Appointment app) throws Exception {
        log.info("Registering " + app.getTitle());
        //Appointment old = em.find(Appointment.class, app.getId());
        //old.setTitle(app.getTitle());
        //em.merge(old);
        String as = app.getStart();
        Calendar cal = Calendar.getInstance();
        cal.set(Integer.valueOf(as.split("/")[2].split(" ")[0]),Integer.valueOf(as.split("/")[0]),Integer.valueOf(as.split("/")[1]),Integer.valueOf(as.split(" ")[1].split(":")[0]),Integer.valueOf(as.split(" ")[1].split(":")[1]));
        app.setStart(String.valueOf(cal.getTimeInMillis()/1000));
        String ae = app.getEnd();
        cal = Calendar.getInstance();
        cal.set(Integer.valueOf(ae.split("/")[2].split(" ")[0]),Integer.valueOf(ae.split("/")[0]),Integer.valueOf(ae.split("/")[1]),Integer.valueOf(ae.split(" ")[1].split(":")[0]),Integer.valueOf(ae.split(" ")[1].split(":")[1]));
        app.setEnd(String.valueOf(cal.getTimeInMillis()/1000));
        em.persist(app);
        appEventSrc.fire(app);
    }

    public void edit(Appointment app) throws Exception {
        log.info("Editiere " + app.getTitle());
        Appointment old = em.find(Appointment.class, app.getId());
        old.setTitle(app.getTitle());
        em.merge(old);
        //appEventSrc.fire(old);
        
        //this.remove(app.getId());
        //this.register(app);
    }
    
    public void remove(long id) throws Exception {
        log.info("Loesche " + id);
        em.remove(em.find(Appointment.class, id));
    }
}
