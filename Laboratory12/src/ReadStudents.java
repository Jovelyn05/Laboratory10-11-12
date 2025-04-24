import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ReadStudents {
    public static void main(String[] args) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            String sql = "SELECT * FROM students";
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String course = rs.getString("course");
                System.out.println("ID: " + id + ", Name: " + name + ", Course: " + course);
            }
        } catch (SQLException e) {
            System.err.println("An error occurred while accessing the database: " + e.getMessage());
        }
    }
}