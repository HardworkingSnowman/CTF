#include <stdio.h>
int main(void)
{
  char shellcode[] = "\x48\xB8\x48\x45\x4C\x4C\x4F\x09\x00\x00\x48\xBB\x00\x00\x00\x00\x00\x01\x00\x00\x48\x01\xD8\x50\x48\xC7\xC7\x01\x00\x00\x00\x48\x89\xE6\x48\xC7\xC2\x06\x00\x00\x00\x48\xC7\xC0\x01\x00\x00\x00\x0F\x05\x48\xC7\xC0\x3C\x00\x00\x00\x48\xC7\xC7\x00\x00\x00\x00\x0F\x05";
  printf("shellcode addr : %p\n", shellcode);
  void(*func)() = (void(*)())shellcode;
  (*func)();
  return 0;
}