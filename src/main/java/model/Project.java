package model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "Project_html5mobi")
public class Project implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue( strategy=GenerationType.IDENTITY) 
    private Long id;

    @NotNull
    @Size(min = 1, max = 25, message = "1-25 letters and spaces")
    private String name;
    

    /*@ManyToMany(mappedBy = "projects")
    @MapKey(name = "id")
    private Map<String, Researcher> projectmembers = new HashMap<String, Researcher>();
*/

    /*@JoinTable(name = "Project_Members", 
       joinColumns = { @JoinColumn(name = "PROJECT_ID") }, 
       inverseJoinColumns = { @JoinColumn(name = "RESEARCHER_ID") })*/
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Researcher> members = new HashSet<Researcher>();
    
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

	public Set<Researcher> getMembers() {
		return members;
	}

	public void setMembers(Set<Researcher> members) {
		this.members = members;
	}
}
