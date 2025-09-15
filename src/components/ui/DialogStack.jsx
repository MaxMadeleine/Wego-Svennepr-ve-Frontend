import {
  DialogStack as KiboDialogStack,
  DialogStackTrigger,
  DialogStackOverlay,
  DialogStackBody,
  DialogStackContent,
  DialogStackHeader,
  DialogStackTitle,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackNext,
  DialogStackPrevious
} from '@/components/ui/kibo-ui/dialog-stack';

export const DialogStack = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
    <KiboDialogStack>
      <DialogStackTrigger className="bg-gradient-to-r from-black to-gray-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg">
        Open Dialog Stack
      </DialogStackTrigger>
      
      <DialogStackOverlay />
      <DialogStackBody>
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Welcome to our platform!</DialogStackTitle>
            <DialogStackDescription>
              This is the original kibo-ui dialog stack with beautiful animations and styling.
            </DialogStackDescription>
          </DialogStackHeader>
          <DialogStackFooter>
            <DialogStackPrevious />
            <DialogStackNext />
          </DialogStackFooter>
        </DialogStackContent>
        
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Step 2: Features</DialogStackTitle>
            <DialogStackDescription>
              Our platform offers many great features including video players, dialog stacks, and more!
            </DialogStackDescription>
          </DialogStackHeader>
          <DialogStackFooter>
            <DialogStackPrevious />
            <DialogStackNext />
          </DialogStackFooter>
        </DialogStackContent>
        
        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Step 3: Getting Started</DialogStackTitle>
            <DialogStackDescription>
              You're all set! Click "Next" to close this tutorial and start exploring.
            </DialogStackDescription>
          </DialogStackHeader>
          <DialogStackFooter>
            <DialogStackPrevious />
            <DialogStackNext />
          </DialogStackFooter>
        </DialogStackContent>

        <DialogStackContent>
          <DialogStackHeader>
            <DialogStackTitle>Step 4 Max</DialogStackTitle>
            <DialogStackDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga harum odit reprehenderit voluptatibus perspiciatis molestiae unde veniam laudantium mollitia nemo corporis cupiditate error, cum, temporibus suscipit tempora. Nobis, rem perspiciatis?
            </DialogStackDescription>
          </DialogStackHeader>
          <DialogStackFooter>
            <DialogStackPrevious />
            <DialogStackNext />
          </DialogStackFooter>
        </DialogStackContent>

      </DialogStackBody>
    </KiboDialogStack>
  </div>
  )
}