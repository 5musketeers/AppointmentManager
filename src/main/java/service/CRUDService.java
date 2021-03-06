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
import model.Project;
import model.Researcher;
import model.ResearcherGroup;

import java.util.logging.Logger;

// The @Stateless annotation eliminates the need for manual transaction demarcation

public class CRUDService<T> {
	
	private final Class<T> clazz;
	
    @Inject
    private Logger log;

    @Inject
    private EntityManager em;

    @Inject
    private Event<T> appEventSrc;
    
    public CRUDService(Class<T> clazz){
    	this.clazz = clazz;
    }
    

    public void register(T app) throws Exception {
        log.info("Registering " + app);
        //Appointment old = em.find(Appointment.class, app.getId());
        //old.setTitle(app.getTitle());
        //em.merge(old);
        em.persist(app);
        appEventSrc.fire(app);
    }

    public void edit(T app) throws Exception {
        //log.info("Editiere " + app.getTitle());
    	if (app.getClass().equals(Researcher.class)) {
    		Researcher temp = (Researcher)app;
    		Researcher old = em.find(Researcher.class, temp.getId());
    		old.setName(temp.getName());
    		old.setEmail(temp.getEmail());
    		old.setPassword(temp.getPassword());
    		em.merge(old);
    	}
    	if (app.getClass().equals(ResearcherGroup.class)) {
    		ResearcherGroup temp = (ResearcherGroup)app;
    		ResearcherGroup old = em.find(ResearcherGroup.class, temp.getId());
    		old.setName(temp.getName());
    		old.setMembers(temp.getMembers());
    		em.merge(old);
    	}
    	if (app.getClass().equals(Project.class)) {
    		Project temp = (Project)app;
    		Project old = em.find(Project.class, temp.getId());
    		old.setName(temp.getName());
    		old.setMembers(temp.getMembers());
    		em.merge(old);
    	}
        
        //old.setTitle(app.getTitle());
    	
        //appEventSrc.fire(old);
        
        //this.remove(app.getId());
        //this.register(app);
    }
    
    public void remove(long id) throws Exception {
        log.info("Loesche " + id);
        em.remove(em.find(clazz, id));
    }
}
