import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class InsertStudent {
    public static void main(String[] args) {
        try (Connection conn = DatabaseConnection.getConnection();
             Scanner scanner = new Scanner(System.in)) {

            System.out.print("Enter student name: ");
            String name = scanner.nextLine();

            System.out.print("Enter course: ");
            String course = scanner.nextLine();

            String sql = "INSERT INTO students (name, course) VALUES (?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name);
            stmt.setString(2, course);

            int rowsInserted = stmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("Student inserted successfully!");
            }
        } catch (SQLException e) {
            System.err.println("Failed to insert student record. Please check the database connection and input values.");
            System.err.println("Error: " + e.getMessage());
        }
    }
}