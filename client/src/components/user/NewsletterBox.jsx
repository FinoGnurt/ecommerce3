const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
        accusantium, culpa deserunt temporibus tempora magnam fugiat voluptas
        quasi placeat sed aliquam? Laudantium maiores rerum exercitationem
        molestiae hic quos, reiciendis quae.
      </p>
      <form
        className="mx-auto my-6 flex w-full items-center gap-3 border pl-3 sm:w-1/2"
        onSubmit={onSubmitHandler}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full outline-none sm:flex-1"
          required
        />
        <button
          type="submit"
          className="bg-black px-10 py-4 text-xs text-white"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
