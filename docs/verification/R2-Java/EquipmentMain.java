import java.util.ArrayList;
import java.util.Scanner;

// Model answer for the manual course assessment; JDK 21, no external dependencies.
public class EquipmentMain {
    static String change(ArrayList<String> names, ArrayList<Boolean> borrowed,
                         String argument, boolean take) {
        final int id;
        try {
            id = Integer.parseInt(argument);
        } catch (NumberFormatException error) {
            return "error: invalid id";
        }
        if (id < 1 || id > names.size()) return "error: missing id";
        int index = id - 1;
        if (take && borrowed.get(index)) return "error: already borrowed";
        if (!take && !borrowed.get(index)) return "error: already available";
        borrowed.set(index, take);
        return (take ? "taken #" : "returned #") + id;
    }

    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        ArrayList<Boolean> borrowed = new ArrayList<>();
        Scanner input = new Scanner(System.in);
        while (input.hasNextLine()) {
            String line = input.nextLine().strip();
            if (line.isEmpty()) {
                System.out.println("error: empty command");
                continue;
            }
            int space = line.indexOf(' ');
            String command = space < 0 ? line : line.substring(0, space);
            String argument = space < 0 ? "" : line.substring(space + 1).strip();
            if (command.equals("quit")) {
                if (!argument.isEmpty()) {
                    System.out.println("error: unexpected argument");
                    continue;
                }
                System.out.println("bye");
                break;
            }
            switch (command) {
                case "add" -> {
                    if (argument.isEmpty()) {
                        System.out.println("error: empty name");
                    } else {
                        names.add(argument);
                        borrowed.add(false);
                        System.out.println("added #" + names.size());
                    }
                }
                case "list" -> {
                    if (!argument.isEmpty()) {
                        System.out.println("error: unexpected argument");
                    } else if (names.isEmpty()) {
                        System.out.println("empty");
                    } else {
                        for (int i = 0; i < names.size(); i++) {
                            System.out.println((i + 1) + " " + names.get(i) + " "
                                + (borrowed.get(i) ? "borrowed" : "available"));
                        }
                    }
                }
                case "take" -> System.out.println(change(names, borrowed, argument, true));
                case "return" -> System.out.println(change(names, borrowed, argument, false));
                default -> System.out.println("error: unknown command");
            }
        }
    }
}
