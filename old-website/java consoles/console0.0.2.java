import java.util.Scanner;
public class console {
  private Scanner scanner = new Scanner(System.in);
  public String TEXT_RESET = "\033[0m";
  public String TEXT_BLACK = "\033[30m";
  public String TEXT_RED = "\033[31m";
  public String TEXT_GREEN = "\033[32m";
  public String TEXT_YELLOW = "\033[33m";
  public String TEXT_BLUE = "\033[34m";
  public String TEXT_PURPLE = "\033[35m";
  public String TEXT_CYAN = "\033[36m";
  public String TEXT_WHITE = "\033[37m";
  public String BLACK_BACKGROUND = "\033[40m";
  public String RED_BACKGROUND = "\033[41m";
  public String GREEN_BACKGROUND = "\033[42m";
  public String YELLOW_BACKGROUND = "\033[43m";
  public String BLUE_BACKGROUND = "\033[44m";
  public String PURPLE_BACKGROUND = "\033[45m";
  public String CYAN_BACKGROUND = "\033[46m";
  public String WHITE_BACKGROUND = "\033[47m";
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