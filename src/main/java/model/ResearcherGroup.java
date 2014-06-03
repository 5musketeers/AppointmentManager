package model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "ResearcherGroup_html5mobi")
public class ResearcherGroup implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue( strategy=GenerationType.IDENTITY) 
    private Long id;

    @NotNull
    @Size(min = 1, max = 25, message = "1-25 letters and spaces")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
