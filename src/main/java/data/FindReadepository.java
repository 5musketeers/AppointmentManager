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

import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import java.util.List;
import java.util.logging.Logger;

public class FindReadepository<T> {

	private final Class<T> clazz;
	
    @Inject
    private Logger log;

    @Inject
    private EntityManager em;
    
    @Inject
    private Event<T> appEventSrc;
    
    public FindReadepository(Class<T> clazz){
    	this.clazz = clazz;
    }

    public T findById(Long id) {
        return em.find(clazz, id);
    }

    public List<T> read() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<T> criteria = cb.createQuery(clazz);
        Root<T> appointment = criteria.from(clazz);
        criteria.select(appointment).orderBy(cb.asc(appointment.get("id")));
        return em.createQuery(criteria).getResultList();
    }
}