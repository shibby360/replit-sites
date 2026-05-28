import java.util.Scanner;
public class console {
  private Scanner scanner = new Scanner(System.in);
  void clear() {
    System.out.print("\033[H\033[2J");  
    System.out.flush();
  }
  void print(String text) {
    System.out.println(text);
  }
  String input(String prompt) {
    this.print(prompt);
    return scanner.nextLine();
  }
}