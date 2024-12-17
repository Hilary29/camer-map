import javax.annotation.processing.Generated;

public class User {
@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String password;
}
